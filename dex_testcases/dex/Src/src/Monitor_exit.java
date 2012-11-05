public class Monitor_exit {

	/**
	 * @param args
	 * Some of this logic was taken from the Dalvik tests
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		monitor_exit t1 = new monitor_exit();
		Object o = new Object();
		Runnable r = new MExitRunnable(t1, o);
		synchronized (o) {
			Thread th = new Thread(r);
			th.start();

			try {
				th.join();

			} catch (InterruptedException e) {
				System.out.println("Interrupted");
			}

		}
		if (t1.result == false) {
			System.out.println("expected IllegalMonitorStateException");
		}
		System.out.println(t1.result);

	}

}

class MExitRunnable implements Runnable {
	private monitor_exit t1;
	private Object o;

	public MExitRunnable(monitor_exit t1, Object o) {
		this.t1 = t1;
		this.o = o;
	}

	public void run() {
		try {
			t1.run(o);
		} catch (IllegalMonitorStateException imse) {
			// expected
			t1.result = true;
		}
	}
}

class monitor_exit {

	public boolean result = false;

	public void run(Object o) {
		synchronized (o) {
		}
	}
}
