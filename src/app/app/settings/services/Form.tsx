// "use client";

// import { useState, useMemo } from "react";
// import { Input } from "@/components/ui/input";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import ChevronDownIcon from "../../../../../public/Down.Icon";
// import ChevronUpIcon from "../../../../../public/Up.Icon";

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { request, PUT } from "@/helpers/fetch.config";
// import { PasswordUpdate, passwordUpdateSchema } from "@/schemas/user.schema";

// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Button } from "@/components/ui/button";

// const AcessForm = ({ toast }: { toast: (title: string, message: string) => void }) => {
//   const [isLoading, setIsLoading] = useState<boolean>(false);

//   // const form = useForm<PasswordUpdate>({
//   //   resolver: zodResolver(passwordUpdateSchema),
//   //   mode: "onChange",
//   // });
//   // const onSubmit = async (values: PasswordUpdate) => {
//   //   setIsLoading(true);
//   //   const body = {
//   //     oldPassword: values.oldPassword,
//   //     newPassword: values.newPassword,
//   //   };
//   //   try {
//   //     const res = await request("procedure", PUT(body));
//   //     if (res.success === false) throw new Error(res.message);
//   //     toast("Sucesso", res.message);
//   //   } catch (error: any) {
//   //     toast("Erro", error.message);
//   //   } finally {
//   //     setIsLoading(false);
//   //   }
//   // };

//   const [sortColumn, setSortColumn] = useState<keyof Service>("procedimento");
//   const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
//   const [searchTerm, setSearchTerm] = useState("");

//   const services = useMemo(() => parseCSV(csvData), []);

//   const sortedAndFilteredServices = useMemo(() => {
//     return services
//       .filter((service) =>
//         Object.values(service).some((value) => value.toString().toLowerCase().includes(searchTerm.toLowerCase()))
//       )
//       .sort((a, b) => {
//         if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1;
//         if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1;
//         return 0;
//       });
//   }, [services, sortColumn, sortDirection, searchTerm]);

//   const handleSort = (column: keyof Service) => {
//     if (column === sortColumn) {
//       setSortDirection(sortDirection === "asc" ? "desc" : "asc");
//     } else {
//       setSortColumn(column);
//       setSortDirection("asc");
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <div className="mb-4">
//         <Input
//           type="text"
//           placeholder="Search..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="max-w-sm"
//         />
//       </div>
//       <div className="overflow-x-auto">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               {["Procedimento", "Agrupador", "Preço Custo", "Preço Sugerido", "Preço Salvo"].map((header, index) => (
//                 <TableHead
//                   key={header}
//                   className="cursor-pointer"
//                   onClick={() => handleSort(Object.keys(services[0])[index] as keyof Service)}>
//                   <div className="flex items-center">
//                     {header}
//                     {sortColumn === Object.keys(services[0])[index] &&
//                       (sortDirection === "asc" ? (
//                         <ChevronUpIcon className="ml-1 h-4 w-4" />
//                       ) : (
//                         <ChevronDownIcon className="ml-1 h-4 w-4" />
//                       ))}
//                   </div>
//                 </TableHead>
//               ))}
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {sortedAndFilteredServices.map((service, index) => (
//               <TableRow key={index}>
//                 <TableCell>{service.procedimento}</TableCell>
//                 <TableCell>{service.agrupador}</TableCell>
//                 <TableCell>{service.preco_custo.toFixed(2)}</TableCell>
//                 <TableCell>{service.preco_sugerido.toFixed(2)}</TableCell>
//                 <TableCell>{service.preco_salvo.toFixed(2)}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );
// };

// export default AcessForm;
