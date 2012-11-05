public class sput_object {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Setter_sobject t = new Setter_sobject();

		//System.out.println("Result should be null");
		System.out.println(t.s_set());

	}

}

class Setter_sobject {
	public static Object s;

	public static Object s_set() {
		return s;
	}
}