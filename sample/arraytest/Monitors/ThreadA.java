class ThreadA extends Thread {
  public void run(){
    synchronized (this) {
    Monitors k = new Monitors();
    k.printThings("a1", "a2");
  }}
}


