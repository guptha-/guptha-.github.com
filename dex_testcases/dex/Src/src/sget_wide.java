public class sget_wide {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Getter_swide t = new Getter_swide();

		//System.out.println("Result should be 12345679890123");
		System.out.println(t.s_get());

	}

}

class Getter_swide {
	public static long s;

	public static long s_get() {
		s = 12345679890123l;
		return s;
	}
}