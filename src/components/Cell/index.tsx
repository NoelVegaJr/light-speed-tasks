export default function Cell({ children }: { children: JSX.Element | string | number }){
  return <td className="px-6 py-3">{children}</td>
}
