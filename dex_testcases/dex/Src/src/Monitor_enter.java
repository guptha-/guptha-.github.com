public class Monitor_enter {

	/**
	 * @param args
	 * Some of this logic was taken from the Dalvik tests
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub

		monitor_enter t1 = new monitor_enter();
		Runnable r1 = new MERunnable(t1);
		Runnable r2 = new MERunnable(t1);
		Thread tr1 = new Thread(r1);
		Thread tr2 = new Thread(r2);
		tr1.start();
		tr2.start();

		try {
			tr1.join();
			tr2.join();
		} catch (InterruptedException e) {
			System.out.println("Interrupted");
		}

		//System.out.println("Result should be 2");
		System.out.println(t1.counter);
	}

}

class monitor_enter implements Runnable {
	public int counter = 0;

	public void run() {
		synchronized (this) {
			int a = counter;
			try {
				Thread.sleep(500);
			} catch (InterruptedException e) {
				System.out.println("Interrupted");
			}

			counter = ++a;
		}
	}
}

class MERunnable implements Runnable {
	private monitor_enter t1;

	MERunnable(monitor_enter t1) {
		this.t1 = t1;
	}

	public void run() {

		t1.run();

	}

}
