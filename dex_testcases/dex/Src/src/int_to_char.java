
public class int_to_char {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		int2char t = new int2char();

		//System.out.println("Result should be A");
		System.out.println(t.i2c(65));

	}

}

class int2char {

	public char i2c(int a) {
		return (char) a;
	}
}