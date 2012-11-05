
public class sget {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Getter_s t = new Getter_s();

		//System.out.println("Result should be 5");
		System.out.println(t.s_get());

	}

}

class Getter_s {
	public static int s;

	public static int s_get() {
		s = 5;
		return s;
	}
}



