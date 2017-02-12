<?php

class Object implements ArrayAccess
{
    private $a;

    private $b;

    public function __construct($a)
    {
        $this->a = $a;
    }

    public function offsetExists($offset)
    {
        return isset($this->{$offset});
    }

    public function offsetGet($offset)
    {
        return $this->{$offset};
    }

    public function offsetSet($offset, $value)
    {
        $this->{$offset} = $value;
    }

    public function offsetUnset($offset)
    {
        unset($this->{$offset});
    }
}

$instance = new Object('get');
var_dump($instance['a']);
var_dump(isset($instance['a']));

$instance['b'] = 'set';
var_dump($instance['b']);
var_dump($instance);
unset($instance['b']);
var_dump($instance);
