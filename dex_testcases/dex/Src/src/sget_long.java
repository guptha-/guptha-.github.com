public class sget_long {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Getter_slong t = new Getter_slong();

		//System.out.println("Result should be 1234567890L");
		System.out.println(t.s_get());

	}

}

class Getter_slong {
	public static long s;

	public static long s_get() {
		s = 1234567890l;
		return s;
	}
}