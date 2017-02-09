<?php

class Sample implements JsonSerializable {
    public function jsonSerialize()
    {
        return [
            'message' => 'message'
        ];
    }
}

echo json_encode(new Sample()) . PHP_EOL;
