public class iget_byte {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Getter_ibyte t = new Getter_ibyte();

		//System.out.println("Result should be 77");
		System.out.println(t.i_get());

	}

}

class Getter_ibyte {
	public byte i;

	public byte i_get() {
		i = 77;
		return i;
	}
}


