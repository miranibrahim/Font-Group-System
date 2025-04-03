<?php
class Router {
    private static $routes = [];

    public static function get($path, $callback) {
        self::$routes['GET'][$path] = $callback;
    }

    public static function post($path, $callback) {
        self::$routes['POST'][$path] = $callback;
    }

    public static function delete($path, $callback) {
        self::$routes['DELETE'][$path] = $callback;
    }

    public static function dispatch($uri, $method) {
        $uri = parse_url($uri, PHP_URL_PATH);
        $uri = rtrim($uri, '/');
        if (empty($uri)) $uri = '/';
        
        // First try direct match
        if (isset(self::$routes[$method][$uri])) {
            call_user_func(self::$routes[$method][$uri]);
            return;
        }
        
        // Try to match routes with parameters
        foreach (self::$routes[$method] as $route => $callback) {
            if (strpos($route, ':') !== false) {
                $routeRegex = preg_replace('/:[^\/]+/', '([^\/]+)', $route);
                $routeRegex = '@^' . $routeRegex . '$@';
                
                if (preg_match($routeRegex, $uri, $matches)) {
                    array_shift($matches); // Remove the full match
                    
                    // Extract parameter names
                    preg_match_all('/:([^\/]+)/', $route, $paramNames);
                    $paramNames = $paramNames[1];
                    
                    // Create params array
                    $params = [];
                    foreach ($paramNames as $index => $name) {
                        $params[$name] = $matches[$index];
                    }
                    
                    call_user_func($callback, $params);
                    return;
                }
            }
        }
        
        // No route found
        http_response_code(404);
        echo json_encode(['error' => 'Route not found']);
    }
}