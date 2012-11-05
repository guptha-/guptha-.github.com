public class sput_byte {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Setter_sbyte t = new Setter_sbyte();

		//System.out.println("Result should be 77");
		System.out.println(t.s_set(77));

	}

}

class Setter_sbyte {

	public static byte s_set(int a) {

		return (byte) a;
	}
}
