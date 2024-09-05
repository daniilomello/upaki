export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      height="50"
      fill="none"
      viewBox="0 0 420 71"
      {...props}
    >
      <path
        fill="#fff"
        d="M0 3.81v33.531c0 18.386 10.479 33.341 30.96 33.341 20.48 0 30.864-14.955 30.864-33.34V3.81H48.678v33.531c0 11.527-4.859 20.672-17.719 20.672-12.383 0-17.718-8.764-17.718-20.672V3.811L0 3.81zM107.405 70.491h13.241V49.058h24.863c15.909 0 23.72-10.192 23.72-22.48 0-12.385-9.05-22.768-23.053-22.768h-38.77l-.001 66.681zm34.675-55.63c8.573 0 13.527 3.905 13.527 12.002 0 5.62-3.525 11.431-13.241 11.431h-21.72V14.861h21.434zM186.804 70.491h15.242l24.1-43.247 24.196 43.248h15.242L226.147 0l-39.343 70.491zm39.343 0c2.953 0 5.43-2.476 5.43-5.429 0-3.048-2.477-5.43-5.43-5.43-2.954 0-5.43 2.382-5.43 5.43 0 2.953 2.476 5.43 5.43 5.43v-.001zM320.597 70.491V41.628l32.102 28.864h16.48l-35.15-33.341L368.036 3.81H351.65l-31.054 28.768V3.811h-13.242v66.682l13.243-.002zM420 70.491V3.811h-13.241v66.682L420 70.491z"
      ></path>
    </svg>
  );
}