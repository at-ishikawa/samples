<?php

namespace Sample;

use Dietcube\RouteInterface;
use Pimple\Container;

class Route implements RouteInterface
{
    /**
     * {@inheritDoc}
     */
    public function definition(Container $container)
    {
        return [
            ['GET', '/', 'Top::index'],
            ['GET', '/blog', 'Blog\Top::index'],
            ['POST', '/blog', 'Blog\Top::create'],
            ['GET', '/blog/{id:\d+}', 'Blog\Top::show'],
        ];
    }
}
