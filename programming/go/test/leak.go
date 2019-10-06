package test

func GoLeakFunc(leak bool) error {
	ch := make(chan int)
	go func() {
		ch <- 1
	}()

	if leak {
		return nil

	}

	<-ch
	return nil
}
