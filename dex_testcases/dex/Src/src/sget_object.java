public class sget_object {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Getter_sobject t = new Getter_sobject();

		//System.out.println("Result should be null");
		System.out.println(t.s_get());

	}

}

class Getter_sobject {
	public static Object s;

	public static Object s_get() {
		s = null;
		return s;
	}
}