<?php

date_default_timezone_set('UTC');
$a = new DateTime('2017-11-17 19:00:00');
$b = new DateTime('2017-11-18 18:59:59');

echo $a->diff($b, false)->format('%r%a');
