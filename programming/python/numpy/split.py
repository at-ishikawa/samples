#! /usr/env/python

import numpy as np
x = np.arange(16.0).reshape(4, 4)
print x.shape

array_count = 4
print np.hsplit(x, array_count)
