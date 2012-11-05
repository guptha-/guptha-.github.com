
public class sput {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Setter_s t = new Setter_s();

		//System.out.println("Result should be 2");
		System.out.println(t.s_set(1));

	}

}

class Setter_s {


	public static int s_set(int s) {
		s++;
		return s;
	}
}
