public class sget_char {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Getter_schar t = new Getter_schar();

		//System.out.println("Result should be A");
		System.out.println(t.s_get());

	}

}

class Getter_schar {
	public static char s;

	public static char s_get() {
		s = 65;
		return s;
	}
}


