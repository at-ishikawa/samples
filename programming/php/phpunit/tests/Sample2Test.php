<?php

namespace Test;

use Sample\ParentClass;
use PHPUnit\Framework\TestCase;

class Sample2Test extends TestCase {
    public function testSample2() {
        $sut = new ParentClass();
        $this->assertSame("This statement should not run", $sut->getText(0));
        $this->assertSame("Not zero", $sut->getText2(1));
    }
}
