
public class int_to_byte {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		int2byte t = new int2byte();

		//System.out.println("Result should be 1");
		System.out.println(t.i2b(1));

	}

}

class int2byte {

	public byte i2b(int a) {
		return (byte) a;
	}
}