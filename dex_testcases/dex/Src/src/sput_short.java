public class sput_short {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Setter_sshort t = new Setter_sshort();

		//System.out.println("Result should be 77");
		System.out.println(t.s_set(77));

	}

}

class Setter_sshort {
	public static short s;

	public static short s_set(int s) {
		return (short) s;
	}
}