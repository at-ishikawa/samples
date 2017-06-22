<?php
/**
 *
 */

namespace Sample;

use Dietcube\Application as DCApplication;
use Pimple\Container;
use Sample\Repository\PostRepository;
use Sample\Service\SampleService;

class Application extends DCApplication
{
    public function init(Container $container)
    {
        // do something before boot
        session_start();
    }

    public function config(Container $container)
    {
        // setup container or services here
        $container['service.sample'] = function () use ($container)  {
            $sample_service = new SampleService();
            $sample_service->setLogger($container['logger']);

            return $sample_service;
        };

        $container['repository.post'] = function () use ($container) {
            $config = $this->getConfig();
            $database_config = $config->get('database');
            return new PostRepository($database_config);
        };
    }
}
