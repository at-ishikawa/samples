<?php

class Foo {
}

class Bar {
}

class Repository {
    public function __construct(Foo $foo, Bar $bar)
    {
    }
}

$reflection = new ReflectionClass(Repository::class);
$parameters = $reflection->getConstructor()->getParameters();
foreach ($parameters as $parameter)
{

    echo $parameter->getClass()->name . PHP_EOL;
    echo $parameter->name . PHP_EOL;
}