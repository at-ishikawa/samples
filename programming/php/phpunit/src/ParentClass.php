<?php

namespace Sample;

class ParentClass {
    public function getText(int $a) {
        if ($a === 0) {
            return "This statement should not run";
        } else {
            return "This should run";
        }
    }

    public function getText2(int $a): string {
        if ($a === 0) {
            return "zero";
        } else {
            return "Not zero";
        }
    }
}
