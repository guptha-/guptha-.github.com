public class iput_byte {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Setter_ibyte t = new Setter_ibyte();

		//System.out.println("Result should be 77");
		System.out.println(t.i_set(77));

	}

}

class Setter_ibyte {

	public byte i_set(int a) {

		return (byte) a;
	}
}
