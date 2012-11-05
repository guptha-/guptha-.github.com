public class iput_short {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Setter_ishort t = new Setter_ishort();

		//System.out.println("Result should be 77");
		System.out.println(t.i_set(77));

	}

}

class Setter_ishort {
	public short i;

	public short i_set(int i) {
		return (short) i;
	}
}