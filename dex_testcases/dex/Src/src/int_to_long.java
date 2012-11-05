
public class int_to_long {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		int2long t = new int2long();

		//System.out.println("Result should be 123456");
		System.out.println(t.i2c(123456));

	}

}

class int2long {

	public long i2c(int a) {
		return (long) a;
	}
}