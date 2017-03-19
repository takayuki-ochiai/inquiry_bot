execute 'change localtime to JST' do
  user 'root'
  command <<-EOC
  cp -p /usr/share/zoneinfo/Japan /etc/localtime
  echo 'ZONE="Asia/Tokyo"' > /etc/sysconfig/clock
  echo 'UTC=false' >> /etc/sysconfig/clock
  EOC
end
