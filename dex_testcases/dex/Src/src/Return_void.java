
public class Return_void {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Getter_returnVoid t = new Getter_returnVoid();

		//System.out.println("Result should be 23456");
		System.out.println(t.returnV());

	}

}

class Getter_returnVoid {

	public int returnV() {
		returnT();
		return 23456;
	}

	private static void returnT() {
		int a = 3;
		int b = 4;
		int c = 0;
		c = a + b;
		return;
	}
}
