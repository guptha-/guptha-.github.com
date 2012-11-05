class ThreadB extends Thread {
  public synchronized void run(){
    Monitors d = new Monitors();
    d.printThings("b1", "b2");
  }
}

