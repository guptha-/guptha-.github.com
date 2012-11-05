public class iget_char {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Getter_ichar t = new Getter_ichar();

		//System.out.println("Result should be A");
		System.out.println(t.i_get());

	}

}

class Getter_ichar {
	public char i;

	public char i_get() {
		i = 65;
		return i;
	}
}


