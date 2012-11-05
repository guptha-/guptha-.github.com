public class Return_wide {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Getter_returnWide t = new Getter_returnWide();

		//System.out.println("Result should be 23456");
		System.out.println(t.returnV());

	}

}

class Getter_returnWide {

	public int returnV() {
		returnT();
		return 23456;
	}

	private static long returnT() {
		int a = 3333333;
		int b = 4444444;
		int c = 0;
		c = a + b;
		return 1l;
	}
}
