class ThreadB extends Thread {
/*  Object lock ; 
  public ThreadB(Object lock) {
    this.lock = lock ; 
  }
*/
  public void run(){
    ThreadTest d = new ThreadTest();
    d.printThings("b1", "b2");
  }
}

