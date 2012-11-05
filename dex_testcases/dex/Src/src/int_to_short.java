public class int_to_short {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		int2short t = new int2short();

		//System.out.println("Result should be 1");
		System.out.println(t.i2c(1));

	}

}

class int2short {

	public short i2c(int a) {
		return (short) a;
	}
}