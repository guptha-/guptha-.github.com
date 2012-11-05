public class sget_byte {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Getter_sbyte t = new Getter_sbyte();

		//System.out.println("Result should be 77");
		System.out.println(t.s_get());

	}

}

class Getter_sbyte {
	public static byte s;

	public static byte s_get() {
		s = 77;
		return s;
	}
}


