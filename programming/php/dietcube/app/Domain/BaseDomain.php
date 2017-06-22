<?php

namespace Sample\Domain;

abstract class BaseDomain
{
    public function __construct(array $array)
    {
        $this->copyFromArray($array);
    }

    public function copyFromArray(array $array)
    {
        foreach ($array as $name => $value) {
            if (!property_exists($this, $name)) {
                continue;
            }
            $this->{$name} = $value;
        }
    }

    public function toArray()
    {
        return get_object_vars($this);
    }

    public function __get($name)
    {
        if (property_exists($this, $name)) {
            return $this->$name;
        }
        throw new \InvalidArgumentException("$name does not exist");
    }
}
