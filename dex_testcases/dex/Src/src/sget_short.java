public class sget_short {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Getter_sshort t = new Getter_sshort();

		//System.out.println("Result should be 3200");
		System.out.println(t.s_get());

	}

}

class Getter_sshort {
	public static short s;

	public static short s_get() {
		s = 3200;
		return s;
	}
}