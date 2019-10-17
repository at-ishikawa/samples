<?php

namespace Test;

use Sample\ParentClass;
use PHPUnit\Framework\TestCase;

class SampleTest extends TestCase {
    public function testSample() {
        $sut = new ParentClass();
        $this->assertSame("This should run", $sut->getText(1));
    }
}
