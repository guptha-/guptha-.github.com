public class iput_char {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Setter_ichar t = new Setter_ichar();

		//System.out.println("Result should be A");
		System.out.println(t.i_set(65));

	}

}

class Setter_ichar {

	public char i_set(int i) {
		return (char) i;
	}
}
