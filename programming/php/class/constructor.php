<?php

class ParentClass {
    public function __construct(string $a, int $b = 10) {
        echo "Parent: " . $a . ", " . $b . PHP_EOL;
    }
}

class ChildClass extends ParentClass {
    public function __construct(string $a) {
        parent::__construct($a);
        echo "Child: " . $a . PHP_EOL;
    }
}

$child = new ChildClass("a", 200);
// The output is next, so 2nd argument 200 is ignored
// Parent: a, 10
// Child: a
