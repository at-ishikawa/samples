<?php

namespace Sample;

class SampleClass {
    public function __construct()
    {
    }
}

// Class name with namespace
var_dump(SampleClass::class);

$instance = new SampleClass;
var_dump(get_class($instance));

// Class name with namespace, namespace only, class only, respectively
$reflection = new \ReflectionClass($instance);
var_dump($reflection->getName(), $reflection->getNamespaceName(), $reflection->getShortName());
