package test

import (
	"log"
	"os"
	"runtime"
	"testing"
)

func TestMain(m *testing.M) {
	want := runtime.NumGoroutine()
	//	goleak.VerifyTestMain(m)

	code := m.Run()

	got := runtime.NumGoroutine()
	if code == 0 && want != got {
		log.Printf("Go routine is not finished: %d", got-want)
		os.Exit(1)
	}
	os.Exit(code)
}

func TestGoLeakFunc(t *testing.T) {
	// If the comment out of next line is removed, the test fails
	//	got := GoLeakFunc(true)
	got := GoLeakFunc(false)
	if got != nil {
		t.Errorf("want = nil, got %w", got)
	}
}

func TestGoLeakFuncInParallel(t *testing.T) {
	t.Parallel()
	got := GoLeakFunc(false)
	if got != nil {
		t.Errorf("want = nil, got %w", got)
	}
}
