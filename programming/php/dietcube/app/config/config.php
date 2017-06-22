<?php
/**
 *
 */

use Monolog\Logger;

return [
    'debug' => false,

    'database' => [
        'driver' => 'pgsql',
        'host' => 'localhost',
        'database' => 'sample',
        'port' => 5432,
        'user' => 'user',
        'password' => 'postgres',
    ],

    'logger' => [
        'path' => dirname(dirname(__DIR__)) . '/tmp/app.log',
        'level' => Logger::WARNING,
    ],
];
