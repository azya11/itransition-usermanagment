import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Lock,
  Trash2,
  ThumbsUp,
  ThumbsDown,
  Filter,
  Search,
  MoreVertical,
  Clock,
} from "lucide-react";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
  company?: string;
  lastSeen: string;
  status: 'active' | 'blocked' | 'inactive';
  activity: number[];
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "Clare, Alex",
    email: "a_clare42@gmail.com",
    role: "N/A",
    lastSeen: "5 minutes ago",
    status: "active",
    activity: [3, 4, 2, 6, 4, 8, 5]
  },
  {
    id: "2", 
    name: "Morrison, Jim",
    email: "dmtimer9@dealyaari.com",
    role: "CFO, Meta Platforms, Inc.",
    lastSeen: "less than a minute ago", 
    status: "active",
    activity: [2, 6, 4, 8, 5, 9, 7]
  },
  {
    id: "3",
    name: "Simone, Nina",
    email: "marishabelin@giftcode-ao.com", 
    role: "Regional Manager, Amazon.com, Inc.",
    lastSeen: "3 weeks ago",
    status: "inactive",
    activity: [1, 2, 1, 3, 2, 4, 1]
  },
  {
    id: "4",
    name: "Zappa, Frank",
    email: "zappa_f@citybank.com",
    role: "Architect, Meta Platforms, Inc.",
    lastSeen: "less than a minute ago",
    status: "active", 
    activity: [4, 3, 5, 2, 6, 7, 8]
  }
];

export const UserTable = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(users.map(user => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (userId: string, checked: boolean) => {
    if (checked) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    }
  };

  const handleBlockUsers = () => {
    setUsers(users.map(user => 
      selectedUsers.includes(user.id) 
        ? { ...user, status: 'blocked' as const }
        : user
    ));
    toast.success(`${selectedUsers.length} user(s) blocked`);
    setSelectedUsers([]);
  };

  const handleDeleteUsers = () => {
    setUsers(users.filter(user => !selectedUsers.includes(user.id)));
    toast.success(`${selectedUsers.length} user(s) deleted`);
    setSelectedUsers([]);
  };

  const getStatusBadge = (status: User['status']) => {
    switch (status) {
      case 'active':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Active</Badge>;
      case 'blocked':
        return <Badge variant="destructive">Blocked</Badge>;
      case 'inactive':
        return <Badge variant="secondary" className="bg-gray-100 text-gray-600">Inactive</Badge>;
    }
  };

  const ActivityChart = ({ activity }: { activity: number[] }) => (
    <div className="flex items-end gap-1 h-8">
      {activity.map((value, index) => (
        <div
          key={index}
          className="bg-primary/20 rounded-sm w-2"
          style={{ height: `${(value / Math.max(...activity)) * 100}%` }}
        />
      ))}
    </div>
  );

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">User Management</CardTitle>
          
          {/* Action Bar */}
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleBlockUsers}
                disabled={selectedUsers.length === 0}
                className="gap-2"
              >
                <Lock className="h-4 w-4" />
                Block
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                disabled={selectedUsers.length === 0}
                className="gap-2"
              >
                <ThumbsUp className="h-4 w-4" />
              </Button>
              
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDeleteUsers}
                disabled={selectedUsers.length === 0}
                className="gap-2"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedUsers.length === users.length}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Last seen</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Activity</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedUsers.includes(user.id)}
                      onCheckedChange={(checked) => handleSelectUser(user.id, checked as boolean)}
                    />
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      {user.role && (
                        <div className="text-sm text-muted-foreground">{user.role}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      {user.lastSeen}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>
                    <ActivityChart activity={user.activity} />
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon-sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Edit User</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Delete User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};