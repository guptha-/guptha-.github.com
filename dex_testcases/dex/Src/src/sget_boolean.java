public class sget_boolean {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Getter_sbool t = new Getter_sbool();

		//System.out.println("Result should be ture");
		System.out.println(t.s_get());

	}

}

class Getter_sbool {
	public static boolean s;

	public static boolean s_get() {
		s = true;
		return s;
	}
}


