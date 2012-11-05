public class iput_wide {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Setter_iwide t = new Setter_iwide();

		//System.out.println("Result should be 778899112233");
		System.out.println(t.i_set(778899112233l));

	}

}

class Setter_iwide {
	public long i;

	public long i_set(long i) {
		return i;
	}
}