class ThreadA extends Thread {
  public void run(){
  /*  synchronized (ThreadTest) {*/
    ThreadTest k = new ThreadTest();
    k.printThings("a1", "a2");
  }
}


